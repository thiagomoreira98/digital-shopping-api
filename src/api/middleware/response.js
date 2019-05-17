module.exports = (req, res, next) => {

    res.ok = (content, status) => {
        if(typeof content == 'string') {
            return res.status(status || 200).json({ message: content });
        }

        res.status(status || 200).json(content);
    }

    res.error = (message, status) => {
        res.status(status || 500).json({ message });
    }

    next();
}