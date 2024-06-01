import {SingleTextStatPoint} from "./single-text-stat-point";

export interface TextTotalStats {
  minute: SingleTextStatPoint;
  hour: SingleTextStatPoint;
  day: SingleTextStatPoint;
  month: SingleTextStatPoint;
  total: SingleTextStatPoint;
}
