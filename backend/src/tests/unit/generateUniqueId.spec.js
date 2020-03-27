const generateUniqueId = require('../../utils/generateUniqueId');



describe('Generate Unique ID', () =>{
    it('should generate an unique ID',( ) =>{
     const id = generateUniqueId();
     expect(id).toHaveLength(8);
        //   expect(2+2).toBe(4);
    });
});
