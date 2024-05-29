type Props = {
  image:any;
  value:string | number;
  label:string
};

const CardOne: React.FC<Props> = ({ image, value, label }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
      {image}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
           {value} 
          </h4>
          <span className="text-sm font-medium">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
