'use client'

import ImageSelectionComponent from "@/components/ImageSelectionComponent";
import { useState } from "react";
import dataJSON from '../public/data.json'
import ImageResultsComponent from "./ImageResultsComponent";

export default function ImageComparisonComponent() {
  const [selectedImageName, setSelectedImageName] = useState('')
  const [results, setResults] = useState()

  const handleSelectImage = (imgName) => {
    console.log('selected image:', imgName)
    setSelectedImageName(imgName)
    findImageMatches(imgName)
  }

  const findImageMatches = (selectedImageName) => {
    // get shapes of selected image
    const selectedImageShapes = dataJSON[selectedImageName]
    console.log('selected image shapes:', selectedImageShapes)

    // get shapes for all images
    let unselectedImageNames = Object.keys(dataJSON)
    unselectedImageNames = unselectedImageNames.filter(n => n !== selectedImageName)
    console.log('unselected image names:', unselectedImageNames)

    // for each selected image shape 
    let selectedShapeResults = []
    for (let i = 0; i < selectedImageShapes.length; i++) {
      let selectedImageShape = selectedImageShapes[i]
      let imageResults = []
      // for each unselected image populate results
      for (let j = 0; j < unselectedImageNames.length; j++) {
        let unselectedImageName = unselectedImageNames[j]
        let unselectedImageShapes = dataJSON[unselectedImageName]
        let shapeResults = []
        // for each unselected image shape populate results
        for (let k = 0; k < unselectedImageShapes.length; k++) {
          let unselectedImageShape = unselectedImageShapes[k]
          let likenessPercentage = 0
          if (!unselectedImageShape.description || !selectedImageShape.description) throw new Error('Data not read correctly: image.shape.description is nullish!')
          // look for unselected image shape that matches selected image shape
          console.log('comparing shapes', unselectedImageShape.description, selectedImageShape.description)
          if (unselectedImageShape.description === selectedImageShape.description) {
            // match found, calculate scores as a percentage
            likenessPercentage = 1 - Math.abs(unselectedImageShape.score - selectedImageShape.score) * 100
          } else {
            // match not found, likeness is 0
            likenessPercentage = 0
          }
          shapeResults.push(likenessPercentage)
        }
        // average the value for each shape to get an average likeness for this image compared to the selected one
        const likenessPercentageTotal = shapeResults.reduce((partialSum, a) => partialSum + a, 0)
        imageResults.push({
          imageName: unselectedImageName,
          averageLikenessPercentage: likenessPercentageTotal <= 0 ? 0 : likenessPercentageTotal / shapeResults.length
        })
      }
      console.log(`results for selected image shape ${i + 1} (${selectedImageShape.description})`, imageResults)
      selectedShapeResults.push({
        shapeName: selectedImageShape.description,
        imageResults
      })
    }

    let finalResults = []
    for (let m = 0; m < unselectedImageNames.length; m++) {
      let name = unselectedImageNames[m]
      let totalScoreAsPercentage = 0
      for (let l = 0; l < selectedShapeResults.length; l++) {
        totalScoreAsPercentage += selectedShapeResults[l].imageResults.filter(ir => ir.imageName === name)[0].averageLikenessPercentage
      }
      totalScoreAsPercentage *= 100

      console.log(`total score for ${name}`, totalScoreAsPercentage)
      finalResults.push({
        imageName: name,
        totalScoreAsPercentage
      })
    }

    finalResults.sort((a, b) => {
      return b.totalScoreAsPercentage - a.totalScoreAsPercentage
    })

    finalResults = finalResults.map(fr => {
      return {
        name: fr.imageName,
        score: `${fr.totalScoreAsPercentage.toFixed(2)}%`
      }
    })

    console.log('finalResults', finalResults)
    setResults(finalResults)
  }

  return (
    <>
      {!selectedImageName && <ImageSelectionComponent handleSelectImage={handleSelectImage} />}
      {results && <ImageResultsComponent results={results} />}
    </>
  )
}
