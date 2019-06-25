export class DateUtils {
    // 获取当前日期偏移preDay天的yyyy-MM-dd形式
    static getDate(preDay: number) {
        const time = (new Date()).getTime() - preDay * 24 * 60 * 60 * 1000;
        const date = new Date(time);
        const month = date.getMonth() + 1;
        const strDate = date.getDate();
        let tempMonth: string;
        let tempStrDate: string;
        if (month >= 1 && month <= 9) {
            tempMonth = '0' + month;
        } else {
            tempMonth = month + '';
        }
        if (strDate >= 0 && strDate <= 9) {
            tempStrDate = '0' + strDate;
        } else {
            tempStrDate = strDate + '';
        }
        const currentDate = date.getFullYear() + '-' + tempMonth + '-' + tempStrDate;
        return currentDate;
    }
}
