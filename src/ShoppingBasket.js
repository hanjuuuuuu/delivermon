import { Table, Button} from 'antd';

const ShoppingBasket = ({newbasket}) => {

    const columns = [
        {
            title: '메뉴',
            dataIndex: 'FOOD_NAME',
            key: 'name',
            render: (text, record, index) => {
                return <Button onChange={() => {}} >{text}</Button>                
            },
        },
        {
            title: '가격',
            dataIndex: 'PRICE',
            key: 'price',
        },
    ]
    const getBasket = () => {
        const basketdata = JSON.parse(sessionStorage.getItem("장바구니"));
        console.log(basketdata);
    }

    return(
        <div>
            <div>
                <h2>장바구니</h2>
            </div>
            <div>
                <button onClick={()=>getBasket}> 주문하기 </button>
            </div>
            <div>
                <Table columns={columns} dataSource={newbasket} />;
            </div>
            
        </div>

    )


}

export default ShoppingBasket;