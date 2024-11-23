import { TechKidsBotGAS } from "tech-kids-bot-gas";
import { GoogleChat } from "tech-kids-bot-gas/dist/main";



/*
 * リマインドするメンターのメールアドレスの配列を取得
 * A2のセルを取得し、下記のフォーマットの際で正常に機能します
 * 
 * 注意　　　複数のユーザーに対して送信する場合は、","で区切ってください
 *          ","の間にスペースは入れないでください
 * "xxxx_xxxx@ca-techkids.com,xxxx_xxxx@ca-techkids.com,xxxx_xxxx@ca-techkids.com"
*/
function getSendGmails(){
    // リマインドを送るメールアドレス一覧
    const SEND_GMAIL_CELL = "B1";


    const spreadSheet = SpreadsheetApp.getActiveSheet();
    const range = spreadSheet.getRange(SEND_GMAIL_CELL);

    
    const sendGmails = range.getValue() as string;

    

    // メンター名の一覧情報を返す
    return sendGmails.split(",");
}



/*
* リマインドする際のメッセージの内容を取得
*/
function getMessage(){
    // メッセージが記載されているセル
    const MESSAGE_CELL = "B2";


    const spreadSheet = SpreadsheetApp.getActiveSheet();
    const range = spreadSheet.getRange(MESSAGE_CELL);

    
    // メッセージの内容を返す
    return range.getValue() as string;
}



function main(){
    
    const message = getMessage();   // メッセージ
    const gmails = getSendGmails();   // ユーザー情報

    const googleChat = new TechKidsBotGAS.GoogleChat();


    gmails.forEach((gmail) => {
        googleChat.sendDirectMessage(
            gmail,
            { text: message },
            false
      );
    });
}
