// //IMPORTS
// import { NextFunction } from "express";
// import { HydratedDocument } from "mongoose";
// import { IUser } from ".";
// import { contactModel } from "../contact";

// //DECLARING POST REMOVE FUNCTION
// const postRemove = async function (
//   this: HydratedDocument<IUser>,
//   next: NextFunction
// ) {
//   //GET ALL CONTACTS OF DELETED USER AND DELETE THEM
//   const contacts = await contactModel.find({ userID: this._id });
//   await Promise.all(
//     contacts.map(async (contact) => {
//       await contact.remove();
//     })
//   );

//   //CALL NEXT FUNCTION
//   next();
// };

// //EXPORT POST REMOVE FUNCTION
// export default postRemove;
