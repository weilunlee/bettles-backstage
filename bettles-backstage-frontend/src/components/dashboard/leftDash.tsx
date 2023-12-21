const LeftDash=():React.JSX.Element=>{
    return(<div className="col-span-2 grid grid-rows-4 grid-cols-2 grid-flow-row gap-4">
        <div className=" bg-white rounded shadow-md">01</div>
        <div className=" bg-white rounded shadow-md">02</div>
        <div className="row-span-1 col-span-2 bg-white rounded shadow-md">03</div>
        <div className="row-span-2 col-span-2 bg-white rounded shadow-md">04</div>
    </div>)
}
export default LeftDash