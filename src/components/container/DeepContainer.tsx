interface IContainer{
    children:React.ReactNode;
}
const DeepContainer = ({children}:IContainer) => {
    return (
        <div className="md:px-[100px]">
            {children}
        </div>
    );
}
 
export default DeepContainer;