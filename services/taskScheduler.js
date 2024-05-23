// cronJobs.js
const cron = require("node-cron");
const {Assignment, Profile} = require("../database"); // Adjust the path as necessary


/*


//TODO: add updatedAt to database and change status to activeStatus clear db entrys and birth this code.

// Schedule the cron job to run once a day at midnight
cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    const cutoffDate = new Date(now.setDate(now.getDate() - 1)); // Set the cutoff date to 1 day ago

    try {
        const result = await Assignment.deleteMany({
            activeStatus: false,
            updatedAt: { $lte: cutoffDate },
        });

        console.log(`Deleted ${result.deletedCount} entries`);
    } catch (error) {
        console.error("Error deleting entries:", error);
    }
});

module.exports = cron;


*/
