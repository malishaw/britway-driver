import { IDriverGeneralData } from "./driverGenaralData";
import { IDriverOtherData } from "./driverOtherData";
import { IDriverPersonalData } from "./driverPersonalData";

export interface IDriverData {
    id?: string;
    isDeleted?: boolean;
    generalData: IDriverGeneralData;
    otherData?: IDriverOtherData;
    personalData?: IDriverPersonalData;
}