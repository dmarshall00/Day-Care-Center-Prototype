import pkg from 'express';
import { sequelize, ChooseTable, /*childTable*/ } from './Table.mjs';

export function ParentProfile(app)
{

  app.post('/fillp', (req, res) =>{
      var user = req.session.username;
      var table = ChooseTable(req.session.user);

      sequelize.sync()
      .then(() => {
          
          updateUser(user, req.body, table);
      })
      .catch((error) =>{
          console.error(error);
      })
  });

  async function updateUser(username, updatedFields, table) {
      try {
          // var user = await table.findByPk(userId);
          const user = await table.findOne({
              where: {
                  UserName: username
              }
          });
        if (!user) {
          console.log('User not found');
          return;
        }
    
        // Update only non-blank fields
        if (updatedFields.Fname[0] !== '' && updatedFields.Fname[0] !== null && updatedFields.Fname !== '' && updatedFields.Fname !== null) {
          user.FirstName = updatedFields.Fname[0];
        }
        if (updatedFields.Lname[0] !== '' && updatedFields.Lname[0] !== null && updatedFields.Lname !== '' && updatedFields.Lname !== null) {
          user.LastName = updatedFields.Lname[0];
        }
        if (updatedFields.Pnum[0] !== '' && updatedFields.Pnum[0] !== null && updatedFields.Pnum !== '' && updatedFields.Pnum !== null) {
          user.PhoneNumber = updatedFields.Pnum[0];
        }
        if (updatedFields.Email[0] !== '' && updatedFields.Email[0] !== null && updatedFields.Email !== '' && updatedFields.Email !== null) {
          user.Email = updatedFields.Email[0];
        }
        if (updatedFields.Address[0] !== '' && updatedFields.Address[0] !== null && updatedFields.Address !== '' && updatedFields.Address !== null) {
          user.ParentAddress = updatedFields.Address[0];
        }
    
        await user.save();
        console.log('User updated successfully');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
}

// export function ChildNum(app){
//     app.get('/childNum', (req, res) =>{
//         sequelize.sync()
//         .then(() => {
//             //Count children
//             var kids = 0;
//             try{
//                 kids = childTable.count({
//                     where: {
//                         ParentID: req.session.ID
//                     }
//                 });
//             }
//             catch(error){
//                 kids = -1;
//             }

//             return res.json({
//                 number: kids
//             })
//         })
//         .catch((error) =>{
//             console.error(error);
//         })
//     });
// }

// export function ChildInsert(app){
//     app.post('/childInsert', (req, res) =>{
//         console.log(req.body);

//         sequelize.sync()
//         .then(() => {
//             childTable.create({
//                 Name: req.body.name[0],
//                 ParentID: req.session.ID
//             })
//             .then((results) => {
//                 console.log("----------------\n", results.dataValues);
//             })
//             .catch((error) => {
//                 console.error('----------------\nFailed to create a new record:\n', error);
//             });
//         })
//         .catch((error) => {
//             console.error(error);
//         })
//     })
// }