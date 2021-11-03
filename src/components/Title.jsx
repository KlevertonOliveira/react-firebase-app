import {PageHeader} from 'antd';

export const Title = ({title}) => {

    return (
        <PageHeader
            style={{border: '2px solid rgb(235, 237, 240)'}}
            title={title}
        />
    )
}