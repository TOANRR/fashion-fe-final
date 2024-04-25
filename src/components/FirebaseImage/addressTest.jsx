import React, { useState } from 'react';
import { Menu, Button, Select, Slider, Tree } from 'antd';
import axios from 'axios';

import './SearchPage.css'; // Import CSS file

const { Option } = Select;
const { TreeNode } = Tree;

const SearchPage = () => {
    const [price, setPrice] = useState([0, 100]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Change to array to store multiple selected categories
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('');

    // Mock data for products
    const sampleProducts = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 150 },
        { id: 3, name: 'Product 3', price: 200 },
        { id: 4, name: 'Product 4', price: 80 },
        { id: 5, name: 'Product 5', price: 120 }
    ];

    // Mock data for categories
    const categories = [
        {
            type: 'women',
            categories: ['Dresses', 'Pants', 'Shirts', 'Handbags']
        },
        {
            type: 'men',
            categories: ['Pants', 'Shirts', 'Jackets', 'Ties']
        }
    ];

    const handleSearch = async () => {
        setLoading(true);
        try {
            // Simulate API call with sample products
            console.log(selectedCategories, price, sortBy)
            setSearchResult(sampleProducts);
        } catch (error) {
            console.error('Error searching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleCategoryChange = (checkedKeys) => { // Handle category change
        setSelectedCategories(checkedKeys);
    };

    return (
        <div className="container">
            <div className="leftSidebar">
                <Menu mode="vertical-right">
                    <Menu.Item>
                        <Slider
                            range
                            min={0}
                            max={1000}
                            defaultValue={[0, 100]}
                            value={price}
                            onChange={(value) => setPrice(value)}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Tree
                            checkable
                            defaultExpandedKeys={['women']}
                            onCheck={handleCategoryChange} // Change to onCheck
                        >
                            {categories.map((category) => (
                                <TreeNode title={category.type} key={category.type}>
                                    {category.categories.map((subCategory) => (
                                        <TreeNode title={subCategory} key={`${category.type}_${subCategory}`} />
                                    ))}
                                </TreeNode>
                            ))}
                        </Tree>
                    </Menu.Item>
                    <Menu.Item>
                        <Button type="primary" onClick={handleSearch} loading={loading}>Search</Button>
                    </Menu.Item>
                </Menu>
            </div>
            <div className="rightContent">
                <div>
                    <h2>Search Result</h2>
                    <Select defaultValue="price_low_to_high" style={{ width: 200 }} onChange={handleSortChange}>
                        <Option value="price_low_to_high">Price: Low to High</Option>
                        <Option value="price_high_to_low">Price: High to Low</Option>
                        <Option value="name_A_to_Z">Name: A to Z</Option>
                        <Option value="name_Z_to_A">Name: Z to A</Option>
                    </Select>
                    <ul>
                        {searchResult.map((product) => (
                            <li key={product.id}>
                                {product.name} - ${product.price}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
