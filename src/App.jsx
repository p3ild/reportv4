
import { Spin } from 'antd';
import usePrepareApp from './core/hooks/prepareApp';
import Footer from './core/ui/footer';
import Headerbar from './core/ui/headerbar';
import Mainbody from './core/ui/mainbody';
import RootOverlay, { OVERLAY_TYPE } from './core/ui/overlay/RootOverlay';

function App() {
  const {
    loaded,
    language
  } = usePrepareApp();


  return <div key={language}>
    <RootOverlay >
      <Spin></Spin>
    </RootOverlay>


    <div className='w-full flex flex-col h-[100vh] overflow-hidden justify-between' >
      <Headerbar />
      <div className='flex-grow overflow-hidden '>
        {loaded && <Mainbody />}
      </div>

      <Footer />
    </div>
  </div>
}

export default App
