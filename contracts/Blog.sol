//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Blog {
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        uint id;
        string title;
        string content;
        bool published;
        address owner;
    }
    /* mappings can be seen as hash tables */
    /* here we create lookups for posts by id and posts by ipfs hash */
    mapping(uint => Post) private idToPost;
    mapping(string => Post) private hashToPost;

    /* events facilitate communication between smart contractsand their user interfaces  */
    /* i.e. we can create listeners for events in the client and also use them in The Graph  */
    event PostCreated(uint id, string title, string hash);

    /* fetches an individual post by the content hash */
    function fetchPost(string memory hash) public view returns (Post memory) {
        return hashToPost[hash];
    }

    /* creates a new post */
    function createPost(string memory title, string memory hash) public {
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = title;
        post.published = true;
        post.content = hash;
        post.owner = msg.sender;
        hashToPost[hash] = post;
        emit PostCreated(postId, title, hash);
    }

    /* fetches all posts */
    function fetchPosts() public view returns (Post[] memory) {
        uint itemCount = _postIds.current();

        Post[] memory posts = new Post[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Post storage currentItem = idToPost[currentId];
            posts[i] = currentItem;
        }
        return posts;
    }

    function fetchPostByOwner(address _owner)
        public
        view
        returns (Post[] memory)
    {
        uint256 totalPostCount = _postIds.current();
        uint256 postCount = 0;
        uint256 currentPostIndex = 0;

        for (uint i = 0; i < totalPostCount; i++) {
            if (idToPost[i].owner == _owner) {
                postCount += 1;
            }
        }

        Post[] memory items = new Post[](postCount);

        for (uint i = 0; i < totalPostCount; i++) {
            if (idToPost[i].owner == _owner) {
                items[currentPostIndex] = idToPost[i];
                currentPostIndex += 1;
            }
        }

        return items;
    }
}
