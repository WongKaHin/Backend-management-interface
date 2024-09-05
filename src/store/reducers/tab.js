import { createSlice } from '@reduxjs/toolkit';
//import Tabs from 'rc-tabs';

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse
        }
    }
})

export const { collapseMenu } = tabSlice.actions
export default tabSlice.reducer