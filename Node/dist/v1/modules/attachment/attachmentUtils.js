// import * as My from "jm-ez-mysql";
// import * as _ from "lodash";
// import { Tables } from "../../../config/tables";
// import { MediaServer } from "../../../helpers/mediaServer";
// export class AttachmentUtils {
//   // get Attachment by Id
//   public static async getAttachmentById(attachmentId: number): Promise<any> {
//     try {
//       return await My.first(`${Tables.ATTACHMENT}`, ["name"], "id = ?", [attachmentId]);
//     } catch (error) {
//       throw error;
//     }
//   }
//   // upload file
//   public static async upload(file: any, uploadType: string, fileName?: string, mimetype?: string) {
//     try {
//       const uploadDetails = await MediaServer.upload(file, uploadType, fileName, mimetype) as any;
//       return uploadDetails.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
//# sourceMappingURL=attachmentUtils.js.map