import LinkModel from "../models/LinkModel.js";
const LinksController = {

    getLinks: async (req, res) => {
        try {
            const links = await LinkModel.find();
            res.status(200).send(links);
        } catch (error) {
            res.status(500).send({ message: "An error occurred", error });
        }
    },

    redirectLink: async (req, res) => {
        const { id } = req.params;
        try {
            const link = await LinkModel.findById(id);
        console.log('dfsdfd', req.query[link.targetParamName]);

            if (!link) {
                res.status(404).send('Link Not Found');
            }
            const clickData = {
                insertedAt: Date.now(),
                ipAddress: req.ip,
                targetParamValue: req.query[link.targetParamName] || ''//לדעת על הקליק הזה מה היה קוד ה- URL

            };
            link.clicks.push(clickData)
            await link.save();
            res.redirect(link.originalUrl);

        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    createLink: async (req, res) => {
        try {
            const { originalUrl } = req.body;
            if (!originalUrl) {
                return res.status(400).send({ message: "originalUrl is required" });
            }

            const newLink = new LinkModel({ originalUrl });
            await newLink.save();

            res.status(201).send(newLink);
        } catch (error) {
            res.status(500).send({ message: "An error occurred", error });
        }
    },

    updateLink: async (req, res) => {
        try {
            const { id } = req.params;
            const { originalUrl } = req.body;

            if (!originalUrl) {
                return res.status(400).send({ message: "originalUrl is required" });
            }

            const updatedLink = await LinkModel.findByIdAndUpdate(id, { originalUrl }, { new: true });

            if (updatedLink) {
                res.status(200).send(updatedLink);
            } else {
                res.status(404).send({ message: "Link not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "An error occurred", error });
        }
    },

    deleteLink: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedLink = await Link.findByIdAndDelete(id);

            if (deletedLink) {
                res.status(200).send({ message: "Link deleted successfully" });
            } else {
                res.status(404).send({ message: "Link not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "An error occurred", error });
        }
    },
    getClicksByTarget: async (req, res) => {

        try {
            const link = await LinkModel.findById(req.params.id);
            if (!link) {
                return res.status(404).send('Link not found');
            }

            const targetValueMap = link.targetValues.reduce((acc, target) => {
                acc[target.value] = target.name;
                return acc;
            }, {});


            const clickData = link.clicks.reduce((acc, click) => {
                const targetValue = click.targetParamValue || 'unknown';
                const targetName = targetValueMap[targetValue] || 'unknown';
                acc[targetName] = (acc[targetName] || 0) + 1;
                return acc;
            }, {});

            res.json(clickData);
        } catch (err) {
            res.status(500).send('Server error');
        }
    },


};

export default LinksController;
