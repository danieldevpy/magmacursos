import ButtonAppBar from "@/components/appBar";
import CardComponent from "@/components/card";

export default function LayoutAPP({children}: any){

    return(
        <>
            <ButtonAppBar/>
            <CardComponent border>
                {children}
            </CardComponent>
        </>
    );
}