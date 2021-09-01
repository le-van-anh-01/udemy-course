import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { decrease, increase } from './counterSlice';

const CounterFeature = ({ }) => {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const hanleIncreaseClick = function () {
        const action = increase();
        console.log(action);
        dispatch(action);
    }

    const hanleDecreaseClick = function () {
        const action = decrease();
        console.log(action);
        dispatch(action);
    }

    return (
        <div>
            Counter: {counter}
            <div>
                <button onClick={hanleDecreaseClick} >Decrease</button>
                <button onClick={hanleIncreaseClick} >Increase</button>
            </div>
        </div>
    )
}

CounterFeature.propTypes = {

}

export default CounterFeature
