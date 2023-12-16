const router = require("express").Router();
const certificateModel =  require('../models/certificate')
router.post("/", (req, res, next) => {
    const certificateBody = req.body;
    const certificate = new certificateModel(certificateBody);

    certificate.save()
      .then(() => {
        console.log(certificate);
        res.status(201).json({ message: 'Certificate added successfully!' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Failed to add Certificate' });
      });
  });

  router.get('/', (req, res, next) => {
    certificateModel.find()
      .then((certificateModel) => {
        if (!certificateModel || certificateModel.length === 0) {

          return res.status(404).json({ message: 'No certificates found.' });
        }

        console.log(certificateModel);
        res.status(200).json({
          message: 'Certificates fetched successfully',
          certificates: certificateModel
        });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Certificates.' });
      });
  });

  router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    certificateModel.findByIdAndDelete(id)
       .then((certificate) => {
         if (!certificate) {
           return res.status(404).json({ message: 'No certificate found with this ID.' });
         }
         res.status(200).json({
           message: 'Certificate deleted successfully',
           certificate: certificate
         });
       })
       .catch(error => {
         console.error(error);
         res.status(500).json({ message: 'Failed to delete certificate.' });
       });
      });


    router.put('/:id', async(req, res, next) => {
        const id = req.params.id;
        const certificateBody = req.body;

        console.log('certificateBody', certificateBody)
        const certificate = await certificateModel.findByIdAndUpdate(id,{$set:certificateBody},{$new:true});
        res.status(200).json(certificate);
        })


module.exports = router



