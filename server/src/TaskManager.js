var mysql = require('promise-mysql');

class TaskManager {

	static async getTaskInfo({task_id}) {
		let connection;
		let reason;
		let success = false;
		let description;
        let due_date;
        let status;
        let weight;
        let name;
        let team;
        let assigned;

		try {
			var config = {
				host: "sql3.freemysqlhosting.net",
				user: "sql3275907",
				password: "ZQndVahfzs",
				database: "sql3275907",
				port: 3306
			};

			var sql = "SELECT * FROM Task WHERE task_id='" + task_id + "'";

			await mysql.createConnection(config).then(function(conn) {
				connection = conn;
				var result = connection.query(sql);
				return result;
			}).then(function(rows) {
				console.log("in");
				success = true;
				console.log(rows);
			}).catch(function(err) {
				throw err;
			});

			
		} catch (err) {
			success = false;
			reason = err;
			console.log(err);
		} finally {
			if (connection) {
				try {
					connection.end();
				} catch (err) {
					console.error(err);
				}
			}
		}
		console.log(success);
		return success ? {success, task_id, description, due_date, status, weight, name, team, assigned} : {success, reason};
	}
}


module.exports = TaskManager;