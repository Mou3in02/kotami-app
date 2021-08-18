import React, {useState, useRef} from 'react'
import './home.css'
import Box from "../../components/box/Box";
import isEmpty from "validator/es/lib/isEmpty";
import isInt from "validator/es/lib/isInt";
import isNumeric from "validator/es/lib/isNumeric";
import Toast from "../../components/toast/Toast";
import html2canvas from "html2canvas";


const Home = () => {

    const [boxes, setBoxes] = useState([])
    const inputRef = useRef(null)
    const gridBlock = useRef(null)
    const [invalidInput, setInvalidInput] = useState(false)


    const getRBG = (input) => {
        if (input < 0) {
            let green = Math.floor((input * -1) * 255 / 100)
            return `rgb(0, ${green}, 0)`
        }
        let red = Math.floor((input) * 255 / 100)
        return `rgb(${red}, 0, 0)`
    }
    const onClickSubmit = () => {
        let inputValue = inputRef.current.value
        setInvalidInput(false)
        if (!inputValue || isEmpty(inputValue) || isEmpty(inputValue.trim()) || !isNumeric(inputValue.trim()) || !isInt(inputValue.trim(), {min: -100, max: 100})) {
            inputRef.current.style.borderColor = '#f00'
            setInvalidInput(true)
            inputRef.current.value = ''
        } else {
            inputRef.current.style.borderColor = '#0f0'
            let newBoxes = [...boxes]
            newBoxes.unshift({
                key: new Date().getTime() + Math.floor(Math.random() * 100000),
                color: getRBG(inputValue)
            })
            setBoxes(newBoxes)
        }
    }
    const onClickDownload = () => {
        html2canvas(gridBlock.current,{})
            .then((canvas) => {
                canvas.style.display = 'none'
                document.body.appendChild(canvas)
                return canvas
            })
            .then((canvas) => {
                const image = canvas.toDataURL('image/png')
                const downloadLink = document.createElement('a')
                downloadLink.setAttribute('download', 'grid.png')
                downloadLink.setAttribute('href', image)
                downloadLink.click()
                canvas.remove()
            })
            .catch((error) => {
                throw error
            })
    }

    return (
        <div className={'app'}>
            {invalidInput && <Toast/>}
            <div className={'add-block'}>
                <input className={'inputX'} ref={inputRef} placeholder={'-100 ... 100'} maxLength={4} />
                <button className={'submitBtn'} onClick={onClickSubmit}>Add</button>
                <button className={'downloadBtn'} onClick={onClickDownload}>Download</button>
            </div>
            <div className={"grid-block"} ref={gridBlock}>
                {boxes.map((box) => {
                    return <Box key={box.key} color={box.color}/>
                })}
            </div>
        </div>
    )
}

export default Home
