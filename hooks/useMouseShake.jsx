import { useCallback, useEffect, useRef } from 'react'
import { getCoreMetaStateByPath } from '@core/stateManage/metadataState'
import { notification } from 'antd'
import { wait } from '@core/network'

/**
 * Mouse shake detection hook
 * Uses mouseShakeConfig from global state for initialization and callback
 * Only initializes once when mouseShakeConfig.initialed is false
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Minimum distance for movement detection (default: 10)
 * @param {number} options.timeWindow - Time window in ms to detect shake (default: 300)
 * @param {number} options.minShakes - Minimum direction changes to trigger (default: 3)
 */
const useMouseShake = ({
    threshold = 30,
    timeWindow = 300,
    minShakes = 5
} = {}) => {
    const mousePositions = useRef([])
    const lastPosition = useRef({ x: 0, y: 0 })
    const shakeDetected = useRef(false)
    const timeoutRef = useRef(null)
    const cleanupRef = useRef(null)

    const calculateDirectionChanges = useCallback((positions) => {
        if (positions.length < 3) return 0

        let directionChanges = 0
        let lastDirection = null

        for (let i = 1; i < positions.length; i++) {
            const prev = positions[i - 1]
            const curr = positions[i]

            const deltaX = curr.x - prev.x
            const deltaY = curr.y - prev.y

            // Determine primary direction
            let currentDirection
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                currentDirection = deltaX > 0 ? 'right' : 'left'
            } else {
                currentDirection = deltaY > 0 ? 'down' : 'up'
            }

            // Count direction changes
            if (lastDirection && lastDirection !== currentDirection) {
                directionChanges++
            }

            lastDirection = currentDirection
        }

        return directionChanges
    }, [])

    const handleMouseMove = useCallback((event) => {
        const currentTime = Date.now()
        const currentPos = { x: event.clientX, y: event.clientY }

        // Calculate distance from last position
        const distance = Math.sqrt(
            Math.pow(currentPos.x - lastPosition.current.x, 2) +
            Math.pow(currentPos.y - lastPosition.current.y, 2)
        )

        // Only record significant movements
        if (distance > threshold) {
            mousePositions.current.push({
                x: currentPos.x,
                y: currentPos.y,
                timestamp: currentTime
            })

            // Keep only recent positions within time window
            mousePositions.current = mousePositions.current.filter(
                pos => currentTime - pos.timestamp <= timeWindow
            )

            // Check for shake pattern
            if (mousePositions.current.length >= minShakes + 1) {
                const directionChanges = calculateDirectionChanges(mousePositions.current)

                if (directionChanges >= minShakes && !shakeDetected.current) {
                    shakeDetected.current = true

                    // console.log('MOUSE SHAKE DETECTED')


                    try {
                        // Move the support button to follow the mouse, if it exists
                        const btnLoadReportSupport = document.getElementById('btn-load-report')
                        if (btnLoadReportSupport) {
                            notification.open({
                                message: 'Mouse shake detected',
                                description: 'Auto load report after close this notice',
                                duration: 1,
                                showProgress: true,
                                onClose: () => {
                                    const btnLoadReportSupport = document.getElementById('btn-load-report')
                                    btnLoadReportSupport && btnLoadReportSupport.click()
                                }
                            })
                        }
                    } catch (error) {
                        // console.log('Error: ', error)
                    }

                    // Use callback from mouseShakeConfig
                    const currentConfig = getCoreMetaStateByPath('mouseShakeConfig')
                    if (currentConfig && currentConfig.callback) {
                        currentConfig.callback({
                            positions: [...mousePositions.current],
                            directionChanges,
                            timestamp: currentTime
                        })
                    }

                    // Reset detection after a brief cooldown
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    timeoutRef.current = setTimeout(() => {
                        shakeDetected.current = false
                        mousePositions.current = []
                    }, 1000)
                }
            }

            lastPosition.current = currentPos
        }
    }, [threshold, timeWindow, minShakes, calculateDirectionChanges])

    useEffect(() => {
        const mouseShakeConfig = getCoreMetaStateByPath('mouseShakeConfig')

        // Only initialize if not already initialized
        if (!mouseShakeConfig.initialed) {
            // console.log('Initializing mouse shake detection...')

            // Add event listener
            document.addEventListener('mousemove', handleMouseMove, { passive: true })

            // Store cleanup function
            cleanupRef.current = () => {
                document.removeEventListener('mousemove', handleMouseMove)
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                    timeoutRef.current = null
                }
            }

            // Mark as initialized
            getCoreMetaStateByPath('actions.setMouseShakeInitialed')(true)

            // console.log('Mouse shake detection initialized!')
        }

        // Cleanup function
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current()
                cleanupRef.current = null
            }
        }
    }, [handleMouseMove])

    // Return utility functions for external control
    return {
        resetShakeDetection: () => {
            shakeDetected.current = false
            mousePositions.current = []
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        },
        isShakeDetected: () => shakeDetected.current,
        setCallback: (callback) => {
            getCoreMetaStateByPath('actions.setMouseShakeCallback')(callback)
        },
        // Debug function to check status
        getStatus: () => {
            const config = getCoreMetaStateByPath('mouseShakeConfig')
            return {
                initialized: config.initialed,
                hasCallback: !!config.callback,
                currentPositions: mousePositions.current.length,
                shakeDetected: shakeDetected.current
            }
        }
    }
}

export default useMouseShake