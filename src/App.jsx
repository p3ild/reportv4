
import useMouseShake from '@core/hooks/useMouseShake';
import { List, Result, Spin, Typography } from 'antd';
import usePrepareApp from './core/hooks/prepareApp';
import Footer from './core/ui/footer';
import Headerbar from './core/ui/headerbar';
import Mainbody from './core/ui/mainbody';
import RootOverlay from './core/ui/overlay/RootOverlay';
import { JsonViewDebug } from '@core/ui/utils/Debug';
import { useCoreMetaState } from '@core/stateManage/metadataState';
import { useShallow } from 'zustand/react/shallow';
import { serializeError } from 'serialize-error';
function App() {
  const {
    loaded,
    language,
  } = usePrepareApp();

  const [
    error
  ] = useCoreMetaState(useShallow(state => ([state.error])))
  useMouseShake()

  return <div key={language}>
    <RootOverlay >
      <Spin></Spin>
    </RootOverlay>


    <div className='w-full flex flex-col h-[100vh] overflow-hidden justify-between' >
      <Headerbar />
      <div className='flex-grow overflow-hidden '>
        {error && <Result
          status="404"
          title={<List
            itemLayout="horizontal"
            dataSource={[error.unknowError]}

            renderItem={(item, index) => (
              <List.Item>
                <Typography.Title level={4} className="w-full">
                  {item}
                </Typography.Title>
              </List.Item>
            )}
          />}
        />}
        {!error && loaded && <Mainbody />}
      </div>

      <Footer />
    </div>
  </div>
}

export default App
