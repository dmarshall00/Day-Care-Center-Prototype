import pkg from 'express';
import { sequelize } from './Table.mjs';

export function ParentProfile(app, workingTable)
{
  var user;

  app.post('/fillp', (req, res) =>{
      user = req.session.username;

      sequelize.sync()
      .then(() => {
          console.log("----------------\n", req.body, "\n");
          console.log("----------------\n", workingTable, "\n");
          console.log("----------------\n", user, "\n");
          updateUser(req.session.ID, req.body);
      })
      .catch((error) =>{
          console.error(error);
      })
  });

  async function updateUser(userId, updatedFields) {
      try {
          // var user = await table.findByPk(userId);
          const user = await workingTable.findOne({
              where: {
                  UserName: user
              }
          });
        if (!user) {
          console.log('User not found');
          return;
        }
    
        // Update only non-blank fields
        if (updatedFields.Fname[0] !== '') {
          user.FirstName = updatedFields.Fname[0];
        }
        if (updatedFields.Lname[0] !== '') {
          user.LastName = updatedFields.Lname[0];
        }
        if (updatedFields.Pnum[0] !== '') {
          user.PhoneNumber = updatedFields.Pnum[0];
        }
        if (updatedFields.Email[0] !== '') {
          user.Email = updatedFields.Email[0];
        }
        if (updatedFields.Address[0] !== '') {
          user.ParentAddress = updatedFields.Address[0];
        }
    
        await user.save();
        console.log('User updated successfully');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
}