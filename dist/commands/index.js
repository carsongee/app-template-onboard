import React, { useState } from 'react';
import { Text, Box, Newline } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Link from 'ink-link';
import { Form } from 'ink-form';
import fs from 'fs';
import path from 'path';
const form = {
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
    const writeEnvFile = (result) => {
        const envFilePath = path.join(process.cwd(), '.env');
        let envContent = Object.entries(result)
            .map(([key, value]) => `${key}='${value}'`)
            .join('\n');
        envContent += '\n';
        fs.writeFileSync(envFilePath, envContent);
    };
    return (React.createElement(Box, { flexDirection: 'column', alignItems: 'center', borderStyle: 'round', borderColor: 'yellow' },
        showForm && (React.createElement(React.Fragment, null,
            React.createElement(Box, { flexGrow: 1 },
                React.createElement(Gradient, { name: "summer" },
                    React.createElement(BigText, { text: "DataRobot" }))),
            React.createElement(Box, { alignItems: "flex-start", flexGrow: 1 },
                React.createElement(Text, null,
                    "Hello! \uD83D\uDC4B Check the ",
                    React.createElement(Link, { url: "https://github.com/datarobot-community/talk-to-my-data-agent/blob/main/README.md" },
                        React.createElement(Text, { color: "blue" }, "README")),
                    " for the full instructions.",
                    React.createElement(Newline, null))),
            React.createElement(Box, null,
                React.createElement(Form, { ...form, onSubmit: (result) => {
                        // Cheat and drop in a random PULUMI password
                        result.PULUMI_CONFIG_PASSPHRASE = 'asdf879789*&^(GBS&^BVAS(*&b6*(AS&BDT&*(^BDFUoiNS &(*TYSAN KJUHDSFB& ^*)))))';
                        writeEnvFile(result);
                        setShowForm(false);
                    } })))),
        !showForm && (React.createElement(Box, null,
            React.createElement(Text, null, "We wrote your selections to your .env file")))));
}
;
