let btn = document.querySelector('.btn')
btn.onclick = () => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = './moyu.js'
    document.body.appendChild(script)
}