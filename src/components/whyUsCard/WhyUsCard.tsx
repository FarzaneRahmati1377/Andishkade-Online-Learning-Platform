interface IWhyUsCard{
    icon:string,
    title:string,
    subTitle:string
}
const WhyUsCard = ({icon,title,subTitle}:IWhyUsCard) => {
    return (
          <div className="min-w-56 bg-white h-44 shadow-md border rounded px-1 flex flex-col justify-center items-center gap-3">
            <img src={icon} className="w-12 h-12"/>
            <span className="font-semibold text-sm">{title}</span>
            <span className="text-xs font-semibold text-gray-500">{subTitle}</span>
          </div>
    );
}
 
export default WhyUsCard ;