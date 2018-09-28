import dbClient from "./dbClient";

class SonarQube {
  async getStatsForProject(projectName) {
    const res = await dbClient.query(```
      SELECT project, count(*) as bugs_amount
      FROM public.sonar_issues
      where project like '%$1%'
      group by project
      order by project
    ```, [projectName]);
    return res.rows;
  }
}

export default new SonarQube();
