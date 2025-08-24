class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 30;
        this.speed = 5;
        this.isRunning = false;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.generateArray();
        this.updateAlgorithmInfo();
    }

    initializeElements() {
        this.arrayContainer = document.getElementById('array-container');
        this.sizeSlider = document.getElementById('array-size');
        this.sizeValue = document.getElementById('size-value');
        this.speedSlider = document.getElementById('speed');
        this.speedValue = document.getElementById('speed-value');
        this.generateBtn = document.getElementById('generate-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.algoBtns = document.querySelectorAll('.algo-btn');
        this.comparisonsSpan = document.getElementById('comparisons');
        this.swapsSpan = document.getElementById('swaps');
        this.timeSpan = document.getElementById('time');
        this.algorithmInfo = document.getElementById('algorithm-info');
    }

    bindEvents() {
        this.sizeSlider.addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            this.sizeValue.textContent = this.arraySize;
            if (!this.isRunning) {
                this.generateArray();
            }
        });

        this.speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            this.speedValue.textContent = this.speed;
        });

        this.generateBtn.addEventListener('click', () => {
            if (!this.isRunning) {
                this.generateArray();
            }
        });

        this.resetBtn.addEventListener('click', () => {
            if (!this.isRunning) {
                this.resetArray();
            }
        });

        this.algoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isRunning) {
                    this.runAlgorithm(e.target.dataset.algorithm);
                }
            });
        });
    }

    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 300) + 10);
        }
        this.renderArray();
        this.resetStats();
    }

    resetArray() {
        this.array = [...this.originalArray || this.array];
        this.renderArray();
        this.resetStats();
    }

    renderArray() {
        this.arrayContainer.innerHTML = '';
        const maxValue = Math.max(...this.array);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${(value / maxValue) * 300}px`;
            bar.style.width = `${Math.max(8, 400 / this.arraySize)}px`;
            bar.setAttribute('data-index', index);
            bar.setAttribute('data-value', value);
            this.arrayContainer.appendChild(bar);
        });
    }

    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.updateStats();
    }

    updateStats() {
        this.comparisonsSpan.textContent = this.comparisons;
        this.swapsSpan.textContent = this.swaps;
        
        if (this.startTime > 0) {
            const elapsed = Date.now() - this.startTime;
            this.timeSpan.textContent = `${elapsed}ms`;
        } else {
            this.timeSpan.textContent = '0ms';
        }
    }

    async delay() {
        const delayTime = (11 - this.speed) * 50;
        await new Promise(resolve => setTimeout(resolve, delayTime));
    }

    highlightBar(index, className) {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        if (bars[index]) {
            bars[index].classList.add(className);
        }
    }

    removeHighlight(index, className) {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        if (bars[index]) {
            bars[index].classList.remove(className);
        }
    }

    async swapBars(index1, index2) {
        this.highlightBar(index1, 'swapping');
        this.highlightBar(index2, 'swapping');
        
        await this.delay();
        
        // Swap values
        [this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];
        this.swaps++;
        this.updateStats();
        
        this.renderArray();
        
        // Re-highlight the swapped bars
        this.highlightBar(index1, 'swapping');
        this.highlightBar(index2, 'swapping');
        
        await this.delay();
        
        this.removeHighlight(index1, 'swapping');
        this.removeHighlight(index2, 'swapping');
    }

    async runAlgorithm(algorithm) {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.resetStats();
        this.startTime = Date.now();
        
        // Store original array for reset
        this.originalArray = [...this.array];
        
        // Disable all buttons
        this.algoBtns.forEach(btn => btn.disabled = true);
        this.generateBtn.disabled = true;
        this.resetBtn.disabled = true;
        
        // Highlight active algorithm
        this.algoBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-algorithm="${algorithm}"]`).classList.add('active');
        
        try {
            switch (algorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'merge':
                    await this.mergeSort();
                    break;
                case 'quick':
                    await this.quickSort();
                    break;
                case 'heap':
                    await this.heapSort();
                    break;
            }
            
            // Mark all bars as sorted
            await this.markAllSorted();
            
        } catch (error) {
            console.error('Sorting error:', error);
        } finally {
            this.isRunning = false;
            
            // Re-enable all buttons
            this.algoBtns.forEach(btn => btn.disabled = false);
            this.generateBtn.disabled = false;
            this.resetBtn.disabled = false;
            
            // Remove active state
            this.algoBtns.forEach(btn => btn.classList.remove('active'));
        }
    }

    async markAllSorted() {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.add('sorted');
            await this.delay();
        }
    }

    // Bubble Sort
    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.comparisons++;
                this.updateStats();
                
                this.highlightBar(j, 'comparing');
                this.highlightBar(j + 1, 'comparing');
                
                await this.delay();
                
                if (this.array[j] > this.array[j + 1]) {
                    await this.swapBars(j, j + 1);
                }
                
                this.removeHighlight(j, 'comparing');
                this.removeHighlight(j + 1, 'comparing');
            }
        }
    }

    // Selection Sort
    async selectionSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            
            for (let j = i + 1; j < n; j++) {
                this.comparisons++;
                this.updateStats();
                
                this.highlightBar(j, 'comparing');
                this.highlightBar(minIndex, 'comparing');
                
                await this.delay();
                
                if (this.array[j] < this.array[minIndex]) {
                    this.removeHighlight(minIndex, 'comparing');
                    minIndex = j;
                }
                
                this.removeHighlight(j, 'comparing');
            }
            
            if (minIndex !== i) {
                await this.swapBars(i, minIndex);
            }
        }
    }

    // Insertion Sort
    async insertionSort() {
        const n = this.array.length;
        for (let i = 1; i < n; i++) {
            let key = this.array[i];
            let j = i - 1;
            
            this.highlightBar(i, 'comparing');
            
            while (j >= 0 && this.array[j] > key) {
                this.comparisons++;
                this.updateStats();
                
                this.highlightBar(j, 'comparing');
                await this.delay();
                
                this.array[j + 1] = this.array[j];
                this.swaps++;
                this.updateStats();
                
                this.removeHighlight(j, 'comparing');
                j--;
                
                this.renderArray();
                this.highlightBar(j + 1, 'comparing');
            }
            
            this.array[j + 1] = key;
            this.removeHighlight(i, 'comparing');
            this.renderArray();
        }
    }

    // Merge Sort
    async mergeSort() {
        await this.mergeSortHelper(0, this.array.length - 1);
    }

    async mergeSortHelper(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await this.mergeSortHelper(left, mid);
            await this.mergeSortHelper(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArray = this.array.slice(left, mid + 1);
        const rightArray = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBar(k, 'comparing');
            await this.delay();
            
            if (leftArray[i] <= rightArray[j]) {
                this.array[k] = leftArray[i];
                i++;
            } else {
                this.array[k] = rightArray[j];
                j++;
            }
            
            this.removeHighlight(k, 'comparing');
            this.renderArray();
            k++;
        }
        
        while (i < leftArray.length) {
            this.array[k] = leftArray[i];
            i++;
            k++;
            this.renderArray();
        }
        
        while (j < rightArray.length) {
            this.array[k] = rightArray[j];
            j++;
            k++;
            this.renderArray();
        }
    }

    // Quick Sort
    async quickSort() {
        await this.quickSortHelper(0, this.array.length - 1);
    }

    async quickSortHelper(low, high) {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSortHelper(low, pi - 1);
            await this.quickSortHelper(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        
        this.highlightBar(high, 'comparing');
        
        for (let j = low; j < high; j++) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBar(j, 'comparing');
            await this.delay();
            
            if (this.array[j] < pivot) {
                i++;
                if (i !== j) {
                    await this.swapBars(i, j);
                }
            }
            
            this.removeHighlight(j, 'comparing');
        }
        
        if (i + 1 !== high) {
            await this.swapBars(i + 1, high);
        }
        
        this.removeHighlight(high, 'comparing');
        return i + 1;
    }

    // Heap Sort
    async heapSort() {
        const n = this.array.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            await this.swapBars(0, i);
            await this.heapify(i, 0);
        }
    }

    async heapify(n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBar(left, 'comparing');
            this.highlightBar(largest, 'comparing');
            
            if (this.array[left] > this.array[largest]) {
                largest = left;
            }
            
            await this.delay();
            this.removeHighlight(left, 'comparing');
            this.removeHighlight(largest, 'comparing');
        }
        
        if (right < n) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBar(right, 'comparing');
            this.highlightBar(largest, 'comparing');
            
            if (this.array[right] > this.array[largest]) {
                largest = right;
            }
            
            await this.delay();
            this.removeHighlight(right, 'comparing');
            this.removeHighlight(largest, 'comparing');
        }
        
        if (largest !== i) {
            await this.swapBars(i, largest);
            await this.heapify(n, largest);
        }
    }

    updateAlgorithmInfo() {
        const algorithmInfo = {
            bubble: {
                name: 'Bubble Sort',
                description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)'
                },
                characteristics: [
                    'Simple to understand and implement',
                    'Good for small datasets',
                    'Stable sorting algorithm',
                    'In-place sorting'
                ]
            },
            selection: {
                name: 'Selection Sort',
                description: 'An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist.',
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)'
                },
                characteristics: [
                    'Simple implementation',
                    'Performs well on small lists',
                    'In-place sorting',
                    'Not stable'
                ]
            },
            insertion: {
                name: 'Insertion Sort',
                description: 'A simple sorting algorithm that builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.',
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)'
                },
                characteristics: [
                    'Efficient for small data sets',
                    'Adaptive algorithm',
                    'Stable sorting',
                    'In-place sorting'
                ]
            },
            merge: {
                name: 'Merge Sort',
                description: 'A divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems until they become simple enough to solve directly.',
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(n)'
                },
                characteristics: [
                    'Guaranteed O(n log n) performance',
                    'Stable sorting algorithm',
                    'Good for large datasets',
                    'Not in-place'
                ]
            },
            quick: {
                name: 'Quick Sort',
                description: 'A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy to sort elements.',
                complexity: {
                    time: 'O(n log n) average, O(n²) worst case',
                    space: 'O(log n)'
                },
                characteristics: [
                    'Excellent average-case performance',
                    'In-place sorting',
                    'Not stable',
                    'Good cache performance'
                ]
            },
            heap: {
                name: 'Heap Sort',
                description: 'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements.',
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(1)'
                },
                characteristics: [
                    'Guaranteed O(n log n) performance',
                    'In-place sorting',
                    'Not stable',
                    'Good for large datasets'
                ]
            }
        };

        this.algoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const algorithm = btn.dataset.algorithm;
                const info = algorithmInfo[algorithm];
                
                this.algorithmInfo.innerHTML = `
                    <h4>${info.name}</h4>
                    <p>${info.description}</p>
                    <h4>Time Complexity</h4>
                    <p><strong>Best/Average/Worst:</strong> ${info.complexity.time}</p>
                    <h4>Space Complexity</h4>
                    <p><strong>Space:</strong> ${info.complexity.space}</p>
                    <h4>Characteristics</h4>
                    <ul>
                        ${info.characteristics.map(char => `<li>${char}</li>`).join('')}
                    </ul>
                `;
            });
        });
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});
