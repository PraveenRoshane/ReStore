import { debounce, TextField } from '@mui/material'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/configerStore'
import { setProductParams } from './catalogSlice';

export default function ProductSearch() {
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setsearchTerm] = useState(productParams.searchTerm)
    const dispatch = useAppDispatch();

    const deboundSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <div>
            <TextField
                label='Search Products'
                variant='outlined'
                fullWidth
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setsearchTerm(event.target.value);
                    deboundSearch(event);
                }}
            />
        </div>
    )
}
