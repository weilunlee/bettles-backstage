import LeftDash from "./leftDash"
import RightDash from "./rightDash"

const Dashboard=():React.JSX.Element=>{
    return(<div className="flex-1 grid grid-cols-3 gap-6">
        <LeftDash />
        <RightDash />
    </div>)
}
export default Dashboard