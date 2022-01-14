import { Button, ButtonGroup } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store/configerStore'
import { decrement, increment } from './counterSlice';

export default function ContactPage() {

    const dispatch = useAppDispatch()
    const {data, title} = useAppSelector(state => state.counter);
    
    return (
        <div>
            <h1>{title}</h1>
            <h1>{data}</h1>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))}>DECREMENT</Button>
                <Button onClick={() => dispatch(increment(1))}>INCREMENT</Button>
                <Button onClick={() => dispatch(increment(5))}>INCREMENT by 5</Button>
            </ButtonGroup>
        </div>
    )
}
