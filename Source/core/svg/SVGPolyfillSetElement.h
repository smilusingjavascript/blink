// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef SVGPolyfillSetElement_h
#define SVGPolyfillSetElement_h

#include "core/svg/SVGPolyfillAnimationElement.h"

namespace blink {

class SVGPolyfillSetElement : public SVGPolyfillAnimationElement {
    DEFINE_WRAPPERTYPEINFO();
public:
    DECLARE_NODE_FACTORY(SVGPolyfillSetElement);

private:
    explicit SVGPolyfillSetElement(Document&);
};

} // namespace blink

#endif // SVGPolyfillSetElement_h
