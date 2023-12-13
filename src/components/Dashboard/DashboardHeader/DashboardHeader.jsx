/* eslint-disable react/prop-types */


const DashboardHeader = ({header}) => {
    return (
        <div>
            <h1 className="text-center text-3xl font-bold">{header}</h1>
            <div className="bg-[#e65c6a] w-14 h-1 mx-auto mt-2"></div>
        </div>
    );
};

export default DashboardHeader;