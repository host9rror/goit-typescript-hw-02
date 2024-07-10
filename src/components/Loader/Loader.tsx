import { Oval } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

    <Oval
      visible={true}
      height={80}
      width={80}
      color="#000000" 
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    </div>
  );
};

export default Loader;
