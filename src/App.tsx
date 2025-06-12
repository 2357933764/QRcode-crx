import { useCallback, useEffect, useState } from 'react'
import QRcode from 'qrcode';
import { base64ToBlob, toast } from './util.js';
import './App.scss'
const IMG = '/loading.gif'
function App() {
  const [value, setValue] = useState('')
  const [img, setImg] = useState()
  const [curUrl, setCurUrl] = useState()
  
  const onChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])
  const onSubmit = async () => {
    if(!img) return;
    const imgBlob = base64ToBlob(img, 'image/png');
    // const urlBlob = new Blob(['' + value], {type: 'text/plain'});
    // const item_1 = new ClipboardItem({ 
    //   'image/png': imgBlob,
    // });
    // const item_2 = new ClipboardItem({ 
    //   'text/plain': urlBlob,
    // });
    const item = new ClipboardItem({
      'image/png': imgBlob
    });
    await navigator.clipboard.write([item]);
    toast('成功复制')
  }
  const onCreate = (value) => {
    if(!value){
      setValue(curUrl)
      value = curUrl
    }
    if(!value) return;
    QRcode.toDataURL(value, {
      width: 220,
      margin: 0,
      errorCorrectionLevel: 'H',
    })
      .then((res: string) => {
        setImg(res);
      })
      .catch(_ => {
        setImg('')
      });
  }

  useEffect(() => {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      console.log('tabs', tabs)
      const url = (tabs?.[0].url) || document.location.href; 
      setCurUrl(url);
      setValue(url);
      onCreate(url)
  });
  }, [])
  return (
    <>
      <div className='wrapper'>
        <div className="toast_box">
            <p id="toast"></p>
        </div>
        <h2 className='title'>输入链接：</h2>
        <div className='input-box'>
          <textarea id="url" className='input-desc' value={value} onChange={onChange}></textarea>
        </div>
        <div className='img-box'>
          <img src={img || IMG} />
        </div>
        <div className="submit-box">
          <button className="btn" onClick={() => onCreate(value)}>生成QR code
          </button>
          <button className={`btn submit ${img ? '' : 'disabled'}`} onClick={onSubmit}>复制QR code</button>
        </div>
      </div>
    </>
  )
}

export default App
