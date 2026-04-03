const { Worker } = require("bullmq");

const connection = {
	host: "redis",
	port: 6379,
};

const worker = new Worker(
	"emailQueue",
	async (job) => {
		console.log("Processing job:", job.name);

		if (job.name === "sendWelcomeEmail") {
			const { email, name } = job.data;

			// simulate email sending
			console.log(`Sending email to ${email}`);

			await new Promise((res) => setTimeout(res, 2000));

			console.log(`Email sent to ${name}`);
		}
	},
	{ connection },
);
