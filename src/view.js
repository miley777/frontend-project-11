import onChange from 'on-change';

export default (value, obj, i = 0) => {
    //const objWithLinks = {};
    //const list = document.createElement('ul');
    const watchedObject = onChange(obj, function(path, value) {
        console.log('value:', value)
        const list = document.createElement('ul');
        list.innerHTML  = `<li>${value}</li>`;
        return list;
        //console.log("Valid!", value);
    })
    watchedObject[++i] = value;
    console.log(JSON.stringify(obj));
    
};
