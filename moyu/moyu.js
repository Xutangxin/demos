class Moyu {
    constructor(width, name) {
        this.width = width
        this.name = name
        this.SIZE = 32
    }

    //初始化canvas
    initCanvas() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.canvas.height = this.SIZE
    }

    //初始化视频
    initVideo() {
        let video = document.createElement('video')
        video.width = this.width
        video.controls = "controls"
        video.src = "./video/" + this.name + ".mp4"
        video.crossOrigin = "anonymous"
        video.autoplay = "autoplay"
        document.body.appendChild(video)

        this.video = video
        this.bindVideoEvents()
    }

    //监听视频事件
    bindVideoEvents() {
        this.video.addEventListener('timeupdate', () => {
            this.videoToImage()
        }, false)
    }

    //视频绘图
    videoToImage() {
        let context = this.canvas.getContext('2d')
        context.clearRect(0, 0, this.SIZE, this.SIZE)
        context.drawImage(this.video, 0, 0, this.SIZE, this.SIZE)
        this.setFavico()
    }

    //将视频截图设置到link标签的href
    setFavico() {
        const url = this.canvas.toDataURL('image/png')
        let icons = [...document.querySelector('head').querySelectorAll('link')]
            .filter(link => {
                const rel = link.getAttribute('rel') || ''
                return rel.indexOf('icon') > -1
            })
        if (icons.length) {
            icons.forEach(icon => icon.setAttribute('href', url))
        } else {
            const icon = document.createElement('link')
            icon.setAttribute('rel', 'icon')
            icon.setAttribute('href', url)
            document.querySelector('head').appendChild(icon)
        }
    }

    init() {
        this.initCanvas()
        this.initVideo()
    }
}

let m = new Moyu('200', 'test')
m.init()