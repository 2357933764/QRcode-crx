export function base64ToBlob(base64Data, contentType) {
    // base64 解码
    let byteString = window.atob(base64Data.substring(base64Data.indexOf(',') + 1));
    // 创建缓冲数组
    let arrayBuffer = new ArrayBuffer(byteString.length);
    // 创建视图
    let intArray  = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: contentType });
}

export function toast(text, time = 2 * 1000) {
    let toast = document.getElementById('toast');
    let toast_box = document.getElementsByClassName('toast_box')[0];
    toast.innerHTML = text;
    toast_box.style.animation = 'show 1.5s'
    toast_box.style.display = 'inline-block';
    setTimeout(function(){
        setTimeout(function(){
            toast_box.style.display = 'none';
        }, 1400)
    }, time)   
}