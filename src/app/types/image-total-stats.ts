import {SingleImageStatPoint} from "./single-image-stat-point";

export interface ImageTotalStats {
  minute: SingleImageStatPoint;
  hour: SingleImageStatPoint;
  day: SingleImageStatPoint;
  month: SingleImageStatPoint;
  total: SingleImageStatPoint;
}
