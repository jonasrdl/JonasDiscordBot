import express from 'express';
import { client } from '..';

const PORT = 55698;
const app = express();

module.exports = {
    init() {
        app.get(`/`, (req, res) => {
            res.send('Hello World');
        });

        app.post('/set/activity', (req, res) => {
            const activityText = req.headers.activitytext as string;

            client.user.setActivity(activityText, {
                type: 'PLAYING'
            });

            res.send('Successfully set activity');
        });

        app.post('/set/username', (req, res) => {
            const username = req.headers.username as string;

            client.user
                .setUsername(username)
                .then(() => {
                    res.send('Username set successfully');
                })
                .catch((error) => {
                    console.log(error);

                    res.send({
                        error: error.message
                    });
                });
        });

        app.get('/get/username', (req, res) => {
            const username = client.user.username;

            res.send({
                username: username
            });
        });



        app.get('/get/verified', (req, res) => {
            const verified = client.user.verified;

            res.send({
                verified: verified
            })
        })

        app.get('/get/mfa', (req, res) => {
            const mfaEnabled = client.user.mfaEnabled;

            res.send({
                mfaEnabled: mfaEnabled
            })
        })

        app.get('/get/avatarURL', (req, res) => {
            const avatarURL = client.user.avatarURL();

            res.send({
                avatarURL: avatarURL
            })
        })

        app.get('/get/tag', (req, res) => {
            const tag = client.user.tag;

            res.send({
                tag: tag
            })
        })

        app.listen(PORT, () => {
            console.log(`API is running on port ${PORT}`);
        });
    }
};
