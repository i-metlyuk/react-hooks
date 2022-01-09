import {Component, useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return [
            'https://cs10.pikabu.ru/post_img/big/2019/04/28/7/1556450017131255008.png',
            'https://cs9.pikabu.ru/post_img/big/2019/04/30/8/1556626390119949692.jpg'
        ]
    }, [])

    function logging() {
        console.log('log!');
    }

    useEffect(() => {
        console.log('effect slide');
        document.title = `Slide: ${slide}`;    
    }, [slide]);

    useEffect(() => {
        console.log('autoplay')
    }, [autoplay])
    
    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <Slide getSomeImages={getSomeImages}></Slide>

                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {
                images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)
            }
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);
    
    return (
        <>
            <button onClick={() => setSlider(false)}>Click</button>
            {slider ? <Slider/> : null}
        </>
    );
}

export default App;
