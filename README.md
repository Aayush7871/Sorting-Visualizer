# Sorting Algorithm Visualizer

A beautiful, interactive web application that visualizes various sorting algorithms in real-time. Watch as different sorting algorithms work their magic on randomly generated arrays with smooth animations and detailed statistics.

## Features

### 🎯 **Six Sorting Algorithms**
- **Bubble Sort** - Simple O(n²) algorithm with adjacent element comparisons
- **Selection Sort** - In-place O(n²) algorithm finding minimum elements
- **Insertion Sort** - Adaptive O(n²) algorithm building sorted array incrementally
- **Merge Sort** - Divide-and-conquer O(n log n) algorithm
- **Quick Sort** - Efficient O(n log n) average case algorithm
- **Heap Sort** - Guaranteed O(n log n) performance using heap data structure

### 🎨 **Interactive Controls**
- **Array Size Slider**: Adjust from 5 to 100 elements
- **Speed Slider**: Control animation speed from 1 (slow) to 10 (fast)
- **Generate New Array**: Create fresh random arrays
- **Reset**: Return to the original unsorted array

### 📊 **Real-time Statistics**
- **Comparisons**: Count of element comparisons made
- **Swaps**: Count of element swaps performed
- **Execution Time**: Real-time measurement in milliseconds

### 🌈 **Visual Features**
- **Color-coded bars**: Different colors for comparing, swapping, and sorted elements
- **Smooth animations**: CSS transitions for all visual changes
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and glass-morphism effects

### 📚 **Educational Information**
- Detailed descriptions of each algorithm
- Time and space complexity information
- Key characteristics and use cases
- Interactive learning experience

## How to Use

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No server setup or installation required

2. **Adjust Settings**
   - Use the sliders to set array size and animation speed
   - Click "Generate New Array" to create different random arrays

3. **Run Algorithms**
   - Click any algorithm button to start visualization
   - Watch the bars move and change colors as the algorithm progresses
   - Observe the statistics updating in real-time

4. **Learn and Explore**
   - Click different algorithms to see their information
   - Compare performance between different algorithms
   - Experiment with different array sizes and speeds

## Technical Details

### **Technologies Used**
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, async/await, and modern DOM manipulation

### **Environment Configuration**
The project includes a `config.env` template file that you can copy to `.env` for local development. This file contains:
- Application settings (port, host, environment)
- Feature flags for enabling/disabling features
- Performance and animation settings
- UI configuration options
- Development and debugging settings
- API configuration for future backend integration
- Security and CORS settings

**To use environment variables:**
1. Copy `config.env` to `.env`
2. Modify the values as needed for your environment
3. The `.env` file is automatically ignored by Git for security

### **Browser Compatibility**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### **Performance Features**
- Efficient rendering with minimal DOM manipulation
- Smooth animations using CSS transitions
- Optimized sorting algorithms with proper async handling
- Memory-efficient array operations

## File Structure

```
sorting-visualizer/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript logic and algorithms
├── config.env          # Environment configuration template
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## Algorithm Complexity

| Algorithm | Time Complexity | Space Complexity | Stability |
|-----------|----------------|------------------|-----------|
| Bubble Sort | O(n²) | O(1) | ✅ Stable |
| Selection Sort | O(n²) | O(1) | ❌ Unstable |
| Insertion Sort | O(n²) | O(1) | ✅ Stable |
| Merge Sort | O(n log n) | O(n) | ✅ Stable |
| Quick Sort | O(n log n) avg, O(n²) worst | O(log n) | ❌ Unstable |
| Heap Sort | O(n log n) | O(1) | ❌ Unstable |

## Customization

### **Adding New Algorithms**
1. Add a new button in `index.html`
2. Implement the sorting function in `script.js`
3. Add algorithm information to the `updateAlgorithmInfo()` method
4. Update the switch statement in `runAlgorithm()`

### **Modifying Visual Styles**
- Edit `styles.css` to change colors, animations, and layout
- Adjust the `delay()` function in `script.js` to change animation timing
- Modify bar dimensions and spacing in the `renderArray()` method

### **Changing Array Generation**
- Modify the `generateArray()` method to create different types of arrays
- Add options for nearly sorted, reverse sorted, or custom array patterns

## Educational Use

This visualizer is perfect for:
- **Computer Science Students**: Understanding sorting algorithm concepts
- **Teachers**: Demonstrating algorithms in classroom settings
- **Developers**: Learning about algorithm performance characteristics
- **Anyone**: Interested in how computers sort data

## Contributing

Feel free to contribute improvements:
- Add new sorting algorithms
- Enhance the visual design
- Improve performance optimizations
- Add new features like sound effects or different visualization modes

## License

This project is open source and available under the MIT License.

---

**Enjoy exploring the fascinating world of sorting algorithms! 🚀**
