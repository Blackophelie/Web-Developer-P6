const Sauce = require("../models/sauces");
const mongoose = require("mongoose");

exports.getAllSauces = (req, res, next) => {
   Sauce.find()
     .then(sauce => res.status(200).json(sauce))
     .catch(error => res.status(400).json({ error }));
   next();
 };

exports.createSauce = (req, res, next) => {
   const sauceObject = JSON.parse(req.body.sauce);
   const sauce = new Sauce({
       ...sauceObject,
       userId: req.auth.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
 
   sauce.save()
   .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
   .catch(error => { res.status(400).json( { error })})
   next();
};

exports.modifySauce = (req, res, next) => {
   const sauceObject = req.file ? {
       ...JSON.parse(req.body.sauce),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
 
   delete sauceObject._userId;
   Sauce.findOne({_id: req.params.id})
      .then((thing) => {
         if (thing.userId != req.auth.userId) {
            res.status(401).json({ message : 'Non autorisé'});
         } else {
            Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'Sauce modifiée !'}))
               .catch(error => res.status(401).json({ error }));
         }
      })
      .catch((error) => {
         res.status(400).json({ error });
      });
   next();
};

exports.deleteSauce = (req, res, next) => {
   Sauce.deleteOne({ _id: req.params.id })
     .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
     .catch(error => res.status(400).json({ error }));
   next();
};

exports.getOneSauce = (req, res, next) => {
   Sauce.findOne({ _id: req.params.id})
     .then(sauce => res.status(200).json(sauce))
     .catch(error => res.status(404).json({ error }));
   next();
};
