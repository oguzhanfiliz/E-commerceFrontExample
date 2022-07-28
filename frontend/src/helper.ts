export default class Helper {
  public static writeToLocal(key, value, timeOut = -1) {
    if (timeOut == 0) return;

    const obj = {
      data: value,
      timeOut: timeOut,
    };

    if (timeOut > 0) obj["startTime"] = new Date().toString();

    let jsonStr = this.objectToJsonStr(obj);
    jsonStr = this.encode(jsonStr);

    localStorage.setItem(key, jsonStr);
  }

  public static readFromLocal(key) {
    let jsonStr = localStorage.getItem(key);
    if (jsonStr == null) return null;

    jsonStr = this.decode(jsonStr);

    const obj = this.jsonStrToObject(jsonStr);

    if (this.getLocalDataExpiration(obj)) return obj.data;
    else {
      this.removeFromLocal(key);
      return null;
    }
  }

  public static objectToJsonStr(obj) {
    return JSON.stringify(obj);
  }

  public static jsonStrToObject(jsonStr) {
    if (jsonStr == "") return "";
    return JSON.parse(jsonStr);
  }

  public static encode(str) {
    return str;
  }
  private static getLocalDataExpiration(obj) {
    if (obj.timeOut < 0) return true;

    const startTime = new Date(obj.startTime);
    const now = new Date();

    const interval = now.getTime() - startTime.getTime();

    return interval < obj.timeOut;
  }

  public static decode(str) {
    return str;
  }
  public static objectToArray(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }

  public static removeFromLocal(key) {
    localStorage.removeItem(key);
  }

  public static arrayExist(data, searchData) {
    const returnData = data.indexOf(searchData);
    if (returnData == -1) return false;
    return true;
  }
  public static str_limit(value, size, bool = true) {
    if (!value) return "";
    value = value.toString();

    if (value.length <= size) {
      return value;
    }
    if (bool) {
      return value.substr(0, size) + "...";
    } else {
      return value.substr(0, size);
    }
  }
  public static dateConvertor(date, format = "YYYY-MM-DD") {
    let dateTime = date.split(" ");
    let dateArr = dateTime[0].split("-");
    let timeArr = dateTime[1].split(":");
    if (format == "YYYY-MM-DD") {
      return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    } else if (format == "HH:mm:ss") {
      return timeArr[0] + ":" + timeArr[1];
    } else {
      return (
        dateArr[2] +
        "/" +
        dateArr[1] +
        "/" +
        dateArr[0] +
        " " +
        timeArr[0] +
        ":" +
        timeArr[1]
      );
    }
  }
  public static objectLegth(obj) {
    if (obj == null) return 0;
    return Object.keys(obj).length;
  }

  public static amountTypeFilter = (amountType) => {
    if(amountType == "TRY") return "₺";
  }
 
}