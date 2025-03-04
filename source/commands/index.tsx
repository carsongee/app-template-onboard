import React, { useState } from 'react';
import { Text, Box, Newline } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Link from 'ink-link';
import { Form, FormProps } from 'ink-form';
import fs from 'fs';
import path from 'path';


const form: FormProps = {
	form: {
		title: "Get Started!",
		sections: [
			{
				title: "DataRobot Information",
				fields: [
					{ type: 'string', name: 'DATAROBOT_ENDPOINT', label: 'DataRobot Endpoint', initialValue: 'https://app.datarobot.com/api/v2' },
					{ type: 'string', name: 'DATAROBOT_API_TOKEN', label: 'DataRobot API Token' },
				],
			},
			{
				title: "LLM Information",
				fields: [
					{ type: 'string', name: 'OPENAI_API_KEY', label: 'Open API KEY' },
					{ type: 'string', name: 'OPENAI_API_VERSION', label: 'OpenVersion', initialValue: '2024-08-01-preview' },
					{ type: 'string', name: 'OPENAI_API_BASE', label: 'Open API Base URL ', initialValue: 'https://<your-deployment>.openai.azure.com' },
					{ type: 'string', name: 'OPENAI_API_DEPLOYMENT_ID', label: 'Open AI Deployment ID', initialValue: 'gpt-4o' },
				],
			},
		],
	},
};

export default function Index() {
	const [showForm, setShowForm] = useState(true);

	const writeEnvFile = (result: any) => {
		const envFilePath = path.join(process.cwd(), '.env');
		let envContent = Object.entries(result)
			.map(([key, value]) => `${key}=${value}`)
			.join('\n');
		envContent += '\n';
		fs.writeFileSync(envFilePath, envContent);
	};

	return (
		<Box flexDirection='column' alignItems='center' borderStyle={'round'} borderColor={'yellow'}>
			{showForm && (
				<>
					<Box flexGrow={1}>
						<Gradient name="summer">
							<BigText text="DataRobot" />
						</Gradient>
					</Box>
					<Box alignItems="flex-start" flexGrow={1}>
						<Text>
							Hello! 👋 Check the <Link url="https://github.com/datarobot-community/talk-to-my-data-agent/blob/main/README.md"><Text color="blue">README</Text></Link> for the full instructions.
							<Newline />
		
						</Text>
					</Box>
					<Box>
						<Form {...form} onSubmit={(result: any) => {
							writeEnvFile(result);
							setShowForm(false);
						}} />
					</Box>
				</>)}
			{!showForm && (
				<Box>
					<Text>We wrote your selections to your .env file</Text>
				</Box>
			)}
		</Box>
	);
};
