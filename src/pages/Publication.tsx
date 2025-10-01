import Navigation from "@/components/Navigation";
import PublicationDetail from "@/components/PublicationDetail";
import { useParams } from "react-router-dom";

const Publication = () => {
  const {id} = useParams();
  return (
    <>
      <div className="bg-background/80 backdrop-blur-sm py-2">
        <Navigation />
      </div>
      <div className="">
        <PublicationDetail id={id} />
      </div>
    </>
  );
};

export default Publication;