import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useRoleCheckAPI from '../../Component/hooks/useRoleCheckAPI';
import PurchaseHistory from './PurchaseHistory/PurchaseHistory';
import PaymentHistory from './PaymentHistory/PaymentHistory';
import MyProfile from './MyProfile/MyProfile';
import SalaryConfirm from './SalaryConfirm/SalaryConfirm';


const Profile = () => {
    const [roleCheck] = useRoleCheckAPI();

    // Admin Check
    const isEmployee = roleCheck?.role == "employee"


    return (
        <div className="mx-auto container">
            <Tabs>

                {/* _______________ Tab List Start _______________ */}
                <TabList>
                    {
                        isEmployee ? <>
                            <Tab><h1 className='text-xl font-bold'>Salary Confirm</h1></Tab>
                        </> : <></>
                    }

                    {/* purchase history  */}
                    <Tab><h1 className='text-xl font-bold'>Purchase History</h1></Tab>

                    {/* Payment History */}
                    <Tab><h1 className='text-xl font-bold'>Payment History</h1></Tab>

                    {/* My Profile */}
                    <Tab><h1 className='text-xl font-bold'>My Profile</h1></Tab>
                </TabList>
                {/* _______________ Tab List End _______________ */}

                {/* Employ Salary Confirm */}
                {
                    isEmployee ? <>
                        <TabPanel>
                            <SalaryConfirm></SalaryConfirm>
                        </TabPanel>
                    </> : <></>
                }

                {/* purchase history  */}
                <TabPanel>
                    <PurchaseHistory></PurchaseHistory>
                </TabPanel>

                {/* Payment History */}
                <TabPanel>
                    <PaymentHistory></PaymentHistory>
                </TabPanel>

                {/* My Profile */}
                <TabPanel>
                    <MyProfile></MyProfile>
                </TabPanel>

            </Tabs>
        </div>
    )
}

export default Profile
