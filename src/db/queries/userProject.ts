import connection from 'db/connection';

export const selectUserProjects = async () => {
  try {
    const statement = `
      SELECT 
        UserProject.id,
        UserProject.is_owner,
        UserProject.can_read, 
        UserProject.can_write, 
        UserProject.project_id, 
        UserProject.created_at,
        UserProject.user_id,
        User.first_name, 
        User.last_name
      FROM UserProject
      INNER JOIN User
        ON User.id = UserProject.user_id
      WHERE 
        project_id = "6f35f124-46d4-11ec-8b6c-d2f44fac733b"
    `;
    const [rows]: unknown[] = await connection.promise().query(statement);
    return <any>rows;
  } catch (e) {
    console.error('selectProjectMembers', e);
  }
};
